def chat(conteent="You are an friendly ai bot that heps users with  their questions.", question='hi'):
    import requests

    api_key = "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"
    endpoint = "https://api.perplexity.ai/chat/completions"

    payload = {
        "model": "sonar-pro",
        "messages": [
            {"role": "system", "content": conteent},
            {"role": "user", "content": question}
        ]
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    response = requests.post(endpoint, json=payload, headers=headers)
    print(response)
    data=response.json()
    return f"{data['choices'][0]['message']['content']}"

    
# while(True):
#     chat(input("What is the role of ai"),input("What Ai should do"))
