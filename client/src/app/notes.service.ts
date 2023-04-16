import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private webRequest: WebRequestService) { }

  getNotes(){
    return this.webRequest.getNotes('notes');
  }

  getSingleNote(id: string){
    return this.webRequest.getSingleNote('notes', id );
  }

  createNewNote(title: string, text: string){
    return this.webRequest.postNote('notes', { title, text })
  }

  getAllNotes(){
    return this.webRequest.getNotes('notes');
  };

  updateSingleNote(id: string, payload: Object){
    return this.webRequest.patchSingleNote('notes', id, payload);
  }

  deleteSingleNote(id: string){
    return this.webRequest.deleteSingleNote('notes', id );
  }

  deleteAllNotes(){
    return this.webRequest.deleteNote('notes');
  }
}
