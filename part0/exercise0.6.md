sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
	Note right of server: The data of new note is sent to server as JSON string.
    server-->>browser: MESSAGE: note created.
    deactivate server
    Note right of browser: Webpage is not reloaded, the new note is added to the list dynamically.