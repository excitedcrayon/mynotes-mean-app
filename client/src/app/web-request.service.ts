import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://mynotes.phylls.org:3000';
  }

  getNotes(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  getSingleNote(uri: string, id: string){
    return this.http.get(`${this.ROOT_URL}/${uri}/${id}`);
  }

  postNote(uri: string, payload: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patchNote(uri: string, payload: Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  patchSingleNote(uri: string, id:string, payload: Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}/${id}`, payload);
  }

  deleteSingleNote(uri: string, id:string){
    return this.http.delete(`${this.ROOT_URL}/${uri}/${id}`);
  }

  deleteNote(uri: string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
