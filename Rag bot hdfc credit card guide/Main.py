import pickle
import numpy as np
import requests
import os
import streamlit as st
import faiss
from sentence_transformers import SentenceTransformer
from keys import API
# ----------------------------
# IMPORTANT: Replace with your actual Perplexity API key
# ----------------------------

st.write("🚀 Streamlit script loaded and running")

# ----------------------------
# Load resources once (cached)
# ----------------------------
@st.cache_resource
def load_resources():
    """
    Loads the necessary resources (model, index, and text chunks) once.
    This function is cached by Streamlit to avoid reloading on every rerun.
    """
    print("Loading the Model...")
    base_path = os.path.dirname(os.path.abspath(__file__))  # folder of script
    pkl_path = os.path.join(base_path, "hdfc.pkl")
    index_path = os.path.join(base_path, "faiss_index.index")

    if not os.path.exists(pkl_path) or not os.path.exists(index_path):
        st.error(f"Required files not found. Please place both '{os.path.basename(pkl_path)}' and '{os.path.basename(index_path)}' in the same directory as this script.")
        st.stop()

    with open(pkl_path, "rb") as f:
        chunk_texts = pickle.load(f)

    index = faiss.read_index(index_path)
    model = SentenceTransformer('all-MiniLM-L6-v2')
    return chunk_texts, index, model, index_path


# ----------------------------
# Retrieve top-k chunks
# ----------------------------
def retrieve_chunks(question, chunk_texts, index, model, top_k=2):
    """
    Retrieves the top-k most relevant text chunks from the FAISS index.
    """
    emb = model.encode([question])
    emb = np.array(emb).astype("float32")
    distances, indices = index.search(emb, top_k)
    retrieved = []
    for idx in indices[0]:
        if idx < 0 or idx >= len(chunk_texts):
            retrieved.append("")
        else:
            retrieved.append(chunk_texts[idx])
    return retrieved, distances[0], indices[0]


# ----------------------------
# Call the LLM with context
# ----------------------------
def genai_answer(question, context):
    """
    Calls the Perplexity API with the provided context and question.
    """
    prompt = f"""You are given the following document context:

{context}

Based on this context, answer the following question clearly and shortly. 
If the answer is not contained within the context, please respond with "I don't know".

Question: {question}
"""

    endpoint = "https://api.perplexity.ai/chat/completions"
    payload = {
        "model": "sonar-pro",
        "messages": [
            {"role": "system", "content": "You are a friendly AI bot that helps users with their questions."},
            {"role": "user", "content": prompt}
        ]
    }
    headers = {
        "Authorization": f"Bearer {API}",
        "Content-Type": "application/json"
    }

    try:
        resp = requests.post(endpoint, json=payload, headers=headers, timeout=30)
        resp.raise_for_status()
        data = resp.json()

        # Safely extract content from the response
        if "choices" in data and len(data["choices"]) > 0:
            message = data["choices"][0].get("message", {})
            content = message.get("content", "")
            return content if content else str(data)
        else:
            return f"Unexpected response format: {data}"

    except requests.exceptions.HTTPError as http_err:
        return f"HTTP error occurred: {http_err}. Response: {resp.text}"
    except Exception as err:
        return f"[ERROR] {err}"


# ----------------------------
# Combined flow
# ----------------------------
def get_final_answer(question, chunk_texts, index, model, top_k=2):
    """
    Combines retrieval and generation steps to get the final answer.
    """
    retrieved, distances, indices = retrieve_chunks(question, chunk_texts, index, model, top_k=top_k)
    context = "\n\n".join([r for r in retrieved if r])
    
    if not context:
        return "I don't know. No relevant context was retrieved.", retrieved, distances, indices

    answer = genai_answer(question, context)
    return answer, retrieved, distances, indices


# ----------------------------
# Streamlit UI
# ----------------------------
st.set_page_config(page_title="RAG Chatbot (FAISS + LLM)", page_icon="🤖", layout="wide")
st.title("📚 RAG Chatbot — model + chunks → LLM")

# Sidebar controls
st.sidebar.header("Settings")
show_context = st.sidebar.checkbox("Show retrieved context", value=True)
clear_chat = st.sidebar.button("Clear chat")

# Load resources (cached)
with st.spinner("Loading model and index..."):
    try:
        chunk_texts, index, model, index_path = load_resources()
        model_name = "all-MiniLM-L6-v2"
    except Exception as e:
        st.error(f"Failed to load resources: {e}")
        st.stop()

# Session state
if "messages" not in st.session_state:
    st.session_state.messages = []

if clear_chat:
    st.session_state.messages = []

# Show chat history
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# Input area
user_question = st.chat_input("Ask a question about your documents...")
if user_question:
    st.session_state.messages.append({"role": "user", "content": user_question})
    with st.chat_message("user"):
        st.markdown(user_question)

    with st.chat_message("assistant"):
        with st.spinner("Retrieving context and contacting LLM..."):
            answer, retrieved, distances, indices = get_final_answer(
                user_question, chunk_texts, index, model, top_k=2
            )

            if show_context:
                st.markdown("**Retrieved context (top-k):**")
                for i, (chunk, dist, idx) in enumerate(zip(retrieved, distances, indices)):
                    with st.expander(f"Chunk #{i+1} — FAISS idx {int(idx)} — dist {float(dist):.4f}"):
                        st.write(chunk if chunk else "_[empty chunk]_")

            st.markdown("**Answer:**")
            st.markdown(answer)
            st.session_state.messages.append({"role": "assistant", "content": answer})

# Small info box
st.sidebar.write("### Info")
st.sidebar.write(f"Chunks loaded: {len(chunk_texts)}")
st.sidebar.write(f"FAISS index: {os.path.basename(index_path)}")
st.sidebar.write(f"Embedding model: {model_name}")
st.sidebar.write("Adjust Top-k in `get_final_answer` call.")
