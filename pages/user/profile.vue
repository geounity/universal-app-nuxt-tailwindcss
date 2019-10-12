<template lang="pug">
  div
    h1 Admin profile
    a(@click="logout") Logout
</template>

<script>
import Cookie from 'js-cookie'
import { auth } from '@/services/firebase'

export default {
  name: 'Profile',
  methods: {
    async logout() {
      auth.signOut()
      await Cookie.remove('access_token')
      location.href = '/'
    }
  }
}
</script>
