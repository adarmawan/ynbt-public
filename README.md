 # <a name="top"></a>Arief Darmawan's AI Experiments
  These are my publicly available tools based on LLM AI technology. Mostly mini extracts from my other full size projects. I'm mostly a backend engineer, so don't expect much with the frontend stuff.
  
  I've been experimenting with LLM since 2022 with davinci-003 and currie-001. 
  
  I am 46 years old. Have been bitten by programming bug since 5th grade. Never stop experimenting since then. 
  I have been a profesional developer since 2002. I've wore many hats. Currently wearing a tech-lead hat :)
  
  My current developments languages: C#, JS, HTML.
  
  
  ### Currently available experiments
  - [AI Mermaid Graph Generator](#tool-1)
  - [AI Persona With Long-term-memory and Knowledgebase](#tool-2)
  - [AI Book Writer](#tool-3)
  - [AI Essay Expert](#tool-4)


  ---
  
  ## <a name="tool-1"></a>Mermaid Graph Generator
  

  This tool is written because of my needs to understand "Troubleshooting Process" and "C# Function" flow written by my team members.
  It convert processes and source code of a function to MermaidJs notation by using OpenAI gpt-3.5-turbo.
  

  ### Tech Used
  * Vanilla JS
  * Bootstrap
  * [Golden Layout](https://github.com/golden-layout/golden-layout)
  * [MermaidJS](https://mermaid.js.org) + [svg-pan-zoom](https://bumbu.me/svg-pan-zoom/)
  * OpenAI gpt-3.5-turbo : Completion
  
  ### Open [Mermaid Graph Generator](https://adarmawan.github.io/tool-1.html)
  
  ---
  ## <a name="tool-2"></a>AI Persona With Long-term-memory and Knowledgebase
  
  I wrote this as a sample of fully client-side implementation of an AI Agent with long-term-memory and a user knowledgebase. The knowledgebase can be a text content or import from your PDF files. PDF text import is using PDFjs on the client-side.

  Currently supporting QueryContext prompt generation and completion API for OpenAI CGTP & LLama2(trough llama.cpp server).

  It mainly use my VectorDB class for its text-vectors storing and searches. The ConversationDB class is a layer above the VectorDB, specializing for the chat system backend.

  ### How to use this using local LLM models?
  * For vector server, use TfJs [Universal Sentence Encoder](https://towardsdatascience.com/how-to-build-a-textual-similarity-analysis-web-app-aa3139d4fb71)
  * For completion server, use [KoboldCPP](https://github.com/LostRuins/koboldcpp/releases/tag/v1.35) OR [llama.cpp-server](https://github.com/ggerganov/llama.cpp/tree/master/examples/server)
  * For models, use any supported [GGML LLM MODELS](https://huggingface.co/models?search=ggml)
  * Why I didnt use those in this implementation? Because I want this thing to be super-simple to follow.

  ### Inference
  * It DOES NOT use the "system" message of gpt API. 
    * Using the system message makes the persona "less smart" currently.
  * It DOES NOT use the array message structure of gpt API.
    * All current needed knowledge context for the chat is ALWAYS in the first "user" message.
  * Structure of the "Query Context" for inference:
    * ===KNOWLEDGEBASE
      * knowledgebase rows based on vectors similarities.
    * ===PAST CONVERSATIONS
      * past conversations between user and persona, based on vectors similarities.
    * ===INSTRUCTION
      * persona.persona_context
      * persona.persona_info
      * \n\n
      * current user query

  ### Tech Used
  * Vanilla JS
  * Bootstrap
  * [Golden Layout](https://github.com/golden-layout/golden-layout)
  * [PDFjs](https://mozilla.github.io/pdf.js/)
  * OpenAI ada-002 : Vector embeddings
  * OpenAI gpt-3.5-turbo : Completion
  * IndexDB : Standard client-side storage for VectorDB persistance
  * VectorDB : Custom text-vectors CRUD & search JSON database. Also used directly used for the user Knowledgebase
  * ConversationDB : A wrapper around VectorDB for chat stuff
  
  
  ### Open [AI Persona With Long-term-memory and Knowledgebase](https://adarmawan.github.io/tool-2.html)

# [This repo GitHub Page](https://adarmawan.github.io)
