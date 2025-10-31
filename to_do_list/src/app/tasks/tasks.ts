import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class TasksComponent implements OnInit, OnChanges {
  @Input() listName: string = 'Diario';

  @Output() tasksChanged = new EventEmitter<void>();

  tasks:{name:string, completed?:boolean}[]=[];
  newTaskName: string = '';
  editTaskName:string='';
  editIndex:number | null = null;

  ngOnInit(){
    this.loadTasks();
  }

  ngOnChanges(changes: SimpleChanges){
    // solo recarga si cambió la lista y no es la primera vez
    if(changes['listName'] && !changes['listName'].firstChange){
      this.loadTasks();
    }
  }

  loadTasks(){
    const savedTasks = localStorage.getItem(`tasks_${this.listName}`);
    if(savedTasks){
      this.tasks = JSON.parse(savedTasks);
    }else{
      this.tasks = [];
    }
    this.tasksChanged.emit(); // avisa al padre para que actualice counts
  }

  addTask(){
    if(this.newTaskName.trim() === '') {
      return;
    }
    this.tasks.push({name: this.newTaskName.trim(), completed: false});
    this.newTaskName = '';
    this.saveTask();
  }

  onEnterKey(event: KeyboardEvent){
    if(event.key === 'Enter'){
      this.addTask();
    }
  }

  deleteTask(id: number){
    this.tasks.splice(id, 1);
    this.saveTask();
  }

  editTask(id:number){
    this.editIndex = id;
    this.editTaskName = this.tasks[id].name;
    // esto hace focus en el input después de que se renderiza
    setTimeout(() => {
      const editInputs = document.querySelectorAll('.edit-task-input') as NodeListOf<HTMLInputElement>;
      if(editInputs.length > 0){
        const editInput = editInputs[0];
        editInput.focus();
        editInput.select();
      }
    }, 0);
  }

  saveEditTask(id: number){
    if(this.editTaskName.trim() === '') {
      this.cancelEdit();
      return;
    }
    this.tasks[id].name = this.editTaskName.trim();
    this.editIndex = null;
    this.editTaskName = '';
    this.saveTask();
  }

  cancelEdit(){
    this.editIndex = null;
    this.editTaskName = '';
  }

  onEditKeyDown(event: KeyboardEvent, id: number){
    if(event.key === 'Enter'){
      this.saveEditTask(id);
    }else if(event.key === 'Escape'){
      this.cancelEdit();
    }
  }

  saveTask(){
    localStorage.setItem(`tasks_${this.listName}`, JSON.stringify(this.tasks));
    this.tasksChanged.emit(); // avisa que cambió para actualizar los counts
  }
}
