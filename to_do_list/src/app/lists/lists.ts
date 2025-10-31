import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TasksComponent} from '../tasks/tasks'

@Component({
  selector: 'app-lists',
  imports: [TasksComponent, CommonModule, FormsModule],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class ListsComponent implements OnInit {

  menuItems = [
    { name: 'Diario', count:0},
    { name: 'Planeado',count:0}
  ];

  selectedListName: string = 'Diario';

  ngOnInit(): void {
    this.updateCounts();
  }

  openTaks(listName: string){
    this.selectedListName = listName;
    this.updateCounts(); // actualiza los números cuando cambias de lista
  }

  updateCounts(){
    // recorre cada item y cuenta sus tareas
    this.menuItems.forEach(item => {
      const savedTasks = localStorage.getItem(`tasks_${item.name}`);
      if(savedTasks){
        const tasks = JSON.parse(savedTasks);
        item.count = tasks.length;
      }else{
        item.count = 0;
      }
    });
  }

  onTasksChanged(){
    this.updateCounts(); // esto se llama desde tasks cuando cambia algo
  }

}
