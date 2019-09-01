const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'your notes'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicate = notes.find((note) => note.title === title)
    
    debugger
    
    if(!duplicate) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)

        console.log(chalk.green.inverse('Note saved!'))
    } else {
        console.log(chalk.red.inverse('Duplicate note!'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()

        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes are:'))

    notes.forEach((note, i) => {
        console.log(++i + '. ' + note.title + ': ' + note.body)
    })
}

const removeNote = (title) => {
    const notes = loadNotes()

    console.log(chalk.inverse('I will delete: ' + title))

    const notesToKeep = notes.filter((note) => note.title != title)

    saveNotes(notesToKeep)

    console.log(chalk.red.inverse('Note deleted!'))
}
const readNote = (title) => {
    const notes = loadNotes()

    const note = notes.find((n) => n.title == title)

    if (note) {
        console.log(chalk.green.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

module.exports = {
    addNote,
    removeNote,
    readNote,
    listNotes
}
