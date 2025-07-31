def fileUpload(file_path):
    import os
    
    def extract_text(file_path):
        from pypdf import PdfReader
        reader = PdfReader(file_path)
        text=''
        for i, page in enumerate(reader.pages):
            text += page.extract_text()
        return text

    file_path = os.path.join(os.path.dirname(__file__), file_path)
    text = extract_text(file_path)
    print("Text Extracted...")

    ## Splitter
    from langchain.text_splitter import CharacterTextSplitter
    from langchain.docstore.document import Document

    def split_text_into_chunks(text, chunk_size=500, chunk_overlap=50):
        splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap
        )
        docs = splitter.split_documents([Document(page_content=text)])
        return docs
    chunks = split_text_into_chunks(text)
    print("Text Splitted to chunks...")

    from sentence_transformers import SentenceTransformer

    # Load model (small, fast, and accurate)
    model = SentenceTransformer('all-MiniLM-L6-v2')

    # Get raw text list
    texts = [doc.page_content for doc in chunks]

    # Generate embeddings
    embeddings = model.encode(texts, show_progress_bar=True)
    print("Created Emmbeddings...")
    # store in db
    import faiss
    import numpy as np
    import pickle

    # Convert embeddings to numpy array
    embedding_array = np.array(embeddings).astype("float32")

    # Create FAISS index
    index = faiss.IndexFlatL2(embedding_array.shape[1])  # L2 = Euclidean distance
    index.add(embedding_array)

    # Save FAISS index and texts
    faiss.write_index(index, "faiss_index.index")
    print("Storing Emmbeddings...")
    print('Faiss Index Created`')
    # Save the associated texts for retrieval
    with open("data.pkl", "wb") as f:
        pickle.dump(texts, f)
    print('Saved as .pkl file ')
    return 'Model is ready'



def loadModel():
    #### srch
    import faiss
    import pickle
    from sentence_transformers import SentenceTransformer

    # Load FAISS index and chunk texts
    with open("data.pkl", "rb") as f:
        chunk_texts = pickle.load(f)
    print("Loading the Model...")
    index = faiss.read_index("faiss_index.index")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    return chunk_texts, index, model
def srch():
    # call funcs
    fileUpload()
def ask_questions(question):
        # Step 1: Embed and search top-k chunks
        conversation = []
        import numpy as np
        def ask_question(question, top_k=2):
            chunk_texts, index, model = loadModel()
            question_embedding = model.encode([question])
            distances, indices = index.search(np.array(question_embedding).astype("float32"), top_k)
            res = [chunk_texts[i] for i in indices[0]]
            # print(res)
            return res
        print("Fetching Similar Matches from document...")
        print("Pushing Data to GenAi...")

        from google import genai
        from google.genai import types
        # Step 2: Get Gemini answer
        def genai_answer(question, context):
            prompt = f"""You are given the following document context:
            print("Generating Response...")

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

            print("Waiting for Response...")
            try:
                response = client.models.generate_content(
                    model=model,
                    contents=contents
                )
                print("Please Wait...")
                print("Thank u For your Patience...")
                print("Here U Go With the response...")
                return response.text
            except Exception as e:
                return f"[ERROR] {e}"

        # Final function to use:
        def get_final_answer(question):
            history='\n\n'.join(conversation)
            file_context = "\n\n".join(history)
            full_context = f"{history}\n\n{file_context}"

            full_context = ask_question(question)
            return genai_answer(question, full_context)

        # # Example use
        # question = input("Enter An Question: ")
        ans = get_final_answer(question)
        print(ans)
        return ans 