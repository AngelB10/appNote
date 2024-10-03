import requestAxios from '../axios';

const state = {
  notes: [],
};

const mutations = {
  setNotes(state, notes) {
    state.notes = notes;
  },
  addNote(state, note) {
    state.notes.push(note);
  },
  removeNote(state, noteId) {
    state.notes = state.notes.filter(note => note.id !== noteId);
  },
};

const actions = {
  async fetchNotes({ commit }) { 
    try {
      const response = await requestAxios.get('/call2/note'); 
      commit('setNotes', response.data.nota);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  },
  async addNoteAction({ commit }, note) {
    try {
      const response = await requestAxios.post('/call2/note', note); 
      commit('addNote', response.data);
      
    } catch (error) {
      console.error('Error adding note:', error);
    }
  },
  async editNoteAction({ commit }, { noteId, updatedNote }) {
    try {
      const response = await requestAxios.put(`/call2/note/${noteId}`, updatedNote);
      commit('updateNote', response.data); 
    } catch (error) {
      console.error('Error editing note:', error);
    }
  },
  async removeNoteAction({ commit }, noteId) {
    try {
      await requestAxios.delete(`/call2/note/${noteId}`); 
      commit('removeNote', noteId);
    } catch (error) { 
      console.error('Error removing note:', error);
    }
  },
};

const getters = {
  allNotes(state) {
    return state.notes;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
