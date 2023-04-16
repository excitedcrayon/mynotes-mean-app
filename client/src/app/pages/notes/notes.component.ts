import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotesService } from 'src/app/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{

  notesForm = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required])
  });

  notes: any;
  singleNote: any;
  formattedDate: any;

  constructor(private notesService: NotesService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.rerouteParameters();
    this.getAllNotes();
  }

  get title(){
    return this.notesForm.get('title');
  }

  get text(){
    return this.notesForm.get('text');
  }

  rerouteParameters(){
    try{
      this.route.params.subscribe((params: Params) => {
        this.notesService.getSingleNote(params['id']).subscribe((singleNote: any) => {
          this.singleNote = singleNote;
          this.formattedDate = new Date(this.singleNote.dateCreated).toLocaleString();
        });
      });
    }catch(error){}
  }

  createNewNote(){
    this.notesService.createNewNote(this.notesForm.value.title as string, this.notesForm.value.text as string).subscribe((response: any) => {
      this.getAllNotes();
    });
    this.notesForm.reset(this.notesForm.value);
  }

  getAllNotes(){
    this.notesService.getAllNotes().subscribe((response: any) => {
      this.notes = response;
    });
  }

  deleteSingleNote(id: string){
    console.log(`Delete single document id: ${id}`);
    this.notesService.deleteSingleNote(id).subscribe((response: any) => {
      console.log(response);
      this.router.navigateByUrl('/');
    });
  }

  updateSingleNote(id: string, title: string, text: string){
    this.notesService.updateSingleNote(id, { title, text }).subscribe((response: any) => {
      this.getAllNotes();

      this.route.params.subscribe((params: Params) => {
        this.router.navigateByUrl(`/notes/${params['id']}`);
      });
    });
  }

  deleteAllNotes(){
    this.notesService.deleteAllNotes().subscribe((response: any) => {
      console.log(response);
      this.router.navigateByUrl('/');
    });
  }
}
