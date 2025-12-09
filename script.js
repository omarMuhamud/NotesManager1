
// storage.js (Conceptual Module for LocalStorage Handling)

/**
 * @exports
 * @function
 * @name getNotes
 * @returns {Array<string>} 
 */
const getNotes = () => {
    
    const notesJSON = localStorage.getItem('notes');
    return notesJSON ? JSON.parse(notesJSON) : [];
};

/**
 * @exports
 * @function
 * @name saveNotes
 * @param {Array<string>} notes
 */
const saveNotes = (notes) => {
    
    localStorage.setItem('notes', JSON.stringify(notes));
};


// script.js (Main Application Logic)




// DOM Elements
const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const notesContainer = document.getElementById('notes-container');

/**
 * Creates the DOM element for a single note.
 * @param {string} noteText - The content of the note.
 * @returns {HTMLElement} The created note div.
 */
const createNoteElement = (noteText) => {
    // 1. Create main container
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    // Use a custom data attribute to store the note's text for deletion logic
    noteDiv.setAttribute('data-note', noteText); 

    // 2. Create text content
    const textSpan = document.createElement('span');
    textSpan.textContent = noteText;
    
    // 3. Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    // Add a specific class for event delegation
    deleteBtn.classList.add('delete-trigger'); 

    // 4. Assemble the note element
    noteDiv.appendChild(textSpan);
    noteDiv.appendChild(deleteBtn);
    
    return noteDiv;
};

/**
 * Renders all notes from the storage to the DOM.
 */
const renderNotes = () => {
    // Clear the current notes (excluding the H2 header)
    notesContainer.querySelectorAll('.note').forEach(note => note.remove());
    
    // Get notes from conceptual storage module
    const notes = getNotes(); 

    notes.forEach(note => {
        const noteElement = createNoteElement(note);
        notesContainer.appendChild(noteElement);
    });
};

/**
 * Handles adding a new note.
 */
const addNote = () => {
    const newNoteText = noteInput.value.trim();

    if (newNoteText) {
        // 1. Get current notes
        const notes = getNotes();
        
        // 2. Add new note to the array
        notes.push(newNoteText);
        
        // 3. Save updated array to storage (conceptual storage module)
        saveNotes(notes);
        
        // 4. Update the DOM by re-rendering
        renderNotes();
        
        // 5. Clear the input
        noteInput.value = '';
    }
};

/**

 * @param {Event} event - The click event.
 */
const deleteNote = (event) => {
    
    if (event.target.classList.contains('delete-trigger')) {
        
        const noteElement = event.target.closest('.note');
        if (noteElement) {
            
            const noteToDelete = noteElement.getAttribute('data-note'); 
            
            
            let notes = getNotes();
            
            
            notes = notes.filter(note => note !== noteToDelete);
            
           
            saveNotes(notes);
            
            
            noteElement.remove();
        }
    }
};



window.addEventListener('load', renderNotes); 


addNoteBtn.addEventListener('click', addNote);


notesContainer.addEventListener('click', deleteNote);