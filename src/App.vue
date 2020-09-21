<template>
  <div id="app">
    <router-view v-show="!$store.state.app.newWindow && !$store.state.app.printing" />
    <portal-target name="app" />
  </div>
</template>
