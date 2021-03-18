import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  count
  SelectedLevel
  status=false
  levelstatus=false
  levels=["basic","intermediate","expert"]
  questions=[
    {
      questionno:1,
      question:"what is nodejs",
      options:["A language","a model","Run time environment"],
      answer:"Run time environment",
      result:"",
      level:"basic"
     
    },
    {
      questionno:2,
      question:"what is angular",
      options:["A language","a framework","Run time environment"],
      answer :"a framework",
      result:"",
      level:"intermediate"
    },
    {
      questionno:3,
      question:"what is express",
      options:["A language","a web framework","Run time environment"],
      answer:"a web framework",
      result:"",
      level:"expert"
    },

  ]
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(formRef){
    this.levelstatus=true
    this.count=0
    this.status=true
    let obj=formRef.value;
    //console.log(formRef.value)
    for (let i = 0; i < this.questions.length; i++) {
      if(obj[i+1]==this.questions[i].answer){
        this.count++;
        this.questions[i].result="right"
      }
      else{
        this.questions[i].result="wrong"
      }
    }
    console.log(this.count)


  }
  onsub(formRef){
      this.SelectedLevel=formRef.value
  }
  start(){
    this.levelstatus=true
  }
}
