<template>
  <div>
  <h1>Instructor Management Pannel</h1>
  <div class="container">
          <table>
          <thead>
          <tr>
            <th>St. Code</th>
            <th>St. Level</th>
            <th>Homeworks</th>
            <th>Exam</th>
            <th>Exam feedback</th>
            <th>Final grade</th>
          </tr>
          </thead>
          <tbody>
          <tr class="item" v-for="grade in grades" :key="grade.id">
            <td><input name="studentcode" type="text" id="studentcode" required v-model="grade.studentcode" readonly></td>
            <td><input name="studentlevel" type="text" id="studentlevel" required v-model="grade.studentlevel" readonly></td>
            <td><input name="hws" type="number" id="hws"  required  v-model="grade.hws"></td>
            <td><input name="exam" type="number" id="exam"  required v-model="grade.exam "></td>
            <td><input name="examfeedback" type="textarea" id="examfeedback" required v-model="grade.examfeedback"></td>
            <td class="final">{{grade.hws + grade.exam}}</td>
            <td>
              <button @click="updateButton(grade.id, grade.hws, grade.exam)" class="button">update</button>
            </td>       
          </tr>
          </tbody>
          </table>
    </div>
  </div> 
</template>


<script>
export default {
  name: "Instructor",
  data() {
    return {
      grades: [],
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/grades`)
        .then((response) => response.json())
        .then((data) => (this.grades = data))
        .catch((err) => console.log(err.message));
    },
    updateButton(gradeID, hw, ex){
      fetch(`http://localhost:3000/api/grades/${gradeID}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({hws: hw, exam: ex}),
      })
      .then((response) => response.json())
      .then((data) => {
        const updatedGrade = data.grade;
        gradeIndex = this.grades.findIndex((c) => c.id === updatedGrade.id);
        if (gradeIndex !== -1){
          this.grades[gradeIndex] = updatedGrade;
        }
      })
      .catch((err)=>console.log(err.message))
    },
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  } 
};
</script>

<style scoped>
.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  margin-top: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 90%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  
}
input{
  width: 100px;
  text-align: center
}
.final{
  background-color: rgb(195, 152, 236);
  font-size: 10px;
}
.button{
  background-color: rgb(195, 152, 236);
  border-radius: 5px;
}
</style>