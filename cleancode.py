def fileUpload():
    import os
    from pypdf import PdfReader
    from langchain.text_splitter import CharacterTextSplitter
    from langchain.docstore.document import Document
    from langchain.vectorstores import FAISS
    from langchain.embeddings import HuggingFaceEmbeddings

    file_path = input("Enter File path:  ")
    file_path = os.path.join(os.path.dirname(__file__), file_path)

    # Extract text
    reader = PdfReader(file_path)
    text = ''.join([page.extract_text() for page in reader.pages])

    print("Text Extracted...")

    # Split text
    splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=500,
        chunk_overlap=50
    )
    docs = splitter.split_documents([Document(page_content=text)])

    print("Text Splitted to chunks...")

    # Create Embedding
    embedding = HuggingFaceEmbeddings(model_name='all-MiniLM-L6-v2')

    # Create VectorStore
    db = FAISS.from_documents(docs, embedding)

    # Save both
    db.save_local("faiss_db")
    print("FAISS Vector DB Created and Stored...")


def loadModel():
    from langchain.vectorstores import FAISS
    from langchain.embeddings import HuggingFaceEmbeddings

    embedding = HuggingFaceEmbeddings(model_name='all-MiniLM-L6-v2')
    db = FAISS.load_local("faiss_db", embeddings=embedding)
    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 2})
    return retriever


def ask_questions(question):
    from google import genai
    from google.genai import types

    retriever = loadModel()
    print("Fetching Similar Matches from document...")

    # Retrieve top-k relevant chunks
    retrieved_docs = retriever.get_relevant_documents(question)
    context = "\n\n".join([doc.page_content for doc in retrieved_docs])

    print("Pushing Data to GenAI...")

    def genai_answer(question, context):
        prompt = f"""You are given the following document context:

{context}

Based on this context, answer the following question clearly:

{question}
"""
        client = genai.Client(api_key="AIzaSyAC9FKrqPTbuuAroSAjvVeUuxLG0vShmk0")
        model = "gemini-2.5-pro"
        contents = [
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=prompt)],
            )
        ]

        try:
            print("Generating Response...")
            response = client.models.generate_content(model=model, contents=contents)
            print("Here U Go With the response...")
            return response.text
        except Exception as e:
            return f"[ERROR] {e}"

    # Final output
    answer = genai_answer(question, context)
    print(answer)
    return answer
