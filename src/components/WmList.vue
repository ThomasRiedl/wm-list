<template>
  <div v-if="ready">
    <div v-if="error">
      <h2>Error: {{ error }}</h2>
    </div>
    <div v-if="loading">
      <h2>Loading data...</h2>
    </div>
    <h1>
      WM 2022: Der Spielplan - Spiele, Termine, Uhrzeit – Gruppenphase bis
      Finale
    </h1>
    <div class="header">
      <h4>
        Der Spielplan für die WM 2022 im Überblick, inklusive aller Termine,
        Spielorte und Anstoßzeiten. Das Turnier findet vom 20. November bis 18.
        Dezember in Katar statt. Österreich hat die Qualifikation nicht
        geschafft.
      </h4>
      <h3>WM 2022: Der Spielplan kompakt:</h3>
      <ul>
        <li>
          Die Anstoßzeiten der WM-Gruppenspiele sind 11:00 Uhr, 14:00 Uhr, 16:00
          Uhr, 17:00 Uhr und 20:00 Uhr (MEZ)
        </li>
        <li>K.o. Phase: Anstoßzeiten jeweils 16:00 Uhr und 20:00 Uhr (MEZ).</li>
        <li>
          Der Zeitunterschied zwischen Katar und Österreich während der WM sind
          2 Stunden. Ortszeit ist also 2 Stunden früher als bei uns.
        </li>
        <li>
          WM-Finale: Das Endspiel findet am 18.12.2022 im Lusail Stadion (80.000
          Zuschauern) statt.
        </li>
      </ul>
    </div>
    <hr />
    <div v-for="(item, index) in data.flags" :key="index">
      {{ item.country }}
    </div>

    <!--
    <div class="gamesToday">
      <h4>Spielplan für {{ currentDate() }}</h4>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Team 1</th>
            <th>Team 2</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in currentMatches()" :key="index">
            <td>{{ item }}</td>
            <td>{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="groups">
      <button
        v-for="(item, index) in data.groups"
        @click="groupInfo(index)"
        :key="index"
      >
        Gruppe: {{ item.group }}
      </button>
    </div>
   -->
  </div>
</template>

<script>
import { useFetch } from '../composable/UseFetch1.js';
import { ref } from 'vue';
//import { onMounted } from "vue";

export default {
  component: {},
  async setup() {
    const { error, loading, data, ready } = await useFetch(
      'https://raw.githubusercontent.com/htlWels/WM/main/spielplan.json',
      {
        'content-type': 'application/json',
      }
    );

    //console.log('loading: ' + ready.value);

    function currentDate() {
      let cD = new Date().toLocaleDateString();
      let res = cD.replace(/\//g, '.');
      return res;
    }
    function groupInfo(index) {
      console.log('group: ' + index);
    }

    function currentMatches() {
      let curDate = currentDate();
      //console.log("currentMatches: " + allGroups)
      let teams = [];
      data.groups.forEach((item) => {
        console.log('item: ' + item.group);
        teams = item.members.map((allGamesOfGroup) => {
          //console.log(allGamesOfGroup)
          if (allGamesOfGroup.date === curDate) {
            console.log(allGamesOfGroup);
            return allGamesOfGroup;
          }
        });
      });
      console.log(teams);
      return teams;
    }
    return {
      data,
      error,
      loading,
      ready,
      groupInfo,
      currentDate,
      currentMatches,
    };
  },
};
</script>

<style scoped>
.header {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.gamesToday {
  text-align: center;
  color: #2c3e50;
}
</style>
