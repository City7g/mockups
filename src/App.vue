<template>
  <AppHeader />
  <SectionFirst />
  <UsersList />
  <CreateUser />
</template>

<script>
import SectionFirst from './components/SectionFirst.vue'
import AppHeader from './components/AppHeader.vue'
import UsersList from './components/UsersList.vue'
import CreateUser from './components/CreateUser.vue'

export default {
  name: 'App',
  components: {
    SectionFirst,
    AppHeader,
    UsersList,
    CreateUser
  }
}
</script>