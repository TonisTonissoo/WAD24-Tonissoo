<template>
  <div>
<h3> Students grades  </h3>

<!-- Task 1 -->
    <div class="container">
          <table>
          <thead>
          <tr>
            <th>St.Code</th>
            <th>St.Level</th>
            <th>Homeworks</th>
            <th>Exam</th>
            <th>Final grade</th>
          </tr>
        </thead>
        <tbody>
          <tr class="item" v-for="grade in grades" :key="grade.id">
            <td>{{ grade.studentcode}}</td>
            <td>{{ grade.studentlevel}}</td>
            <td>{{ grade.hws}}</td>
            <td>{{ grade.exam}}</td>
            <td @click="showFeedback(grade.id)"
            class="red" v-if="grade.final<=50||
            grade.exam<=20||grade.hws<=20">
            {{ grade.final}}</td>
            <td class="green" v-else>{{ grade.final}}</td>
          </tr>
          </tbody>
          </table>
    </div>
    <div v-if="selectedFeedBack" class="feed-box">
      <h3>Exam feedback:</h3>
      <p>{{ selectedFeedBack }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Students",
  data() {
    return {
      grades: [],
      selectedFeedBack: null
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/grades`)
        .then((response) => response.json())
        .then((data) => (this.grades = data))
        .catch((err) => console.log(err.message));
  },
  showFeedback(gradeID) {
    const grade = this.grades.find((a)=>a.id === gradeID)
    if (grade){
      if (grade.examfeedback){
        this.selectedFeedBack = grade.examfeedback
      } else {
        this.selectedFeedBack = "No feedback available"
      }
    } else {
      this.selectedFeedBack = "No feedback available"
    }

  }
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  } 
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
th {
  background: rgb(122, 148, 168);
}
td {
  background: rgb(138, 208, 255);
}
th, td {
  font-size: 15px;
  margin-bottom: 5px;
  padding: 8px 10px;
}
.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 90%;
  display: flex;
  justify-content: center;
}
.red{
  background-color: red;
}
.green{
  background-color: green;
}
.feed-box{
  background: #f971ce;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  padding: 20px 20px;
  margin: auto;
  width: 90%;
  display: flex;
}

</style>
