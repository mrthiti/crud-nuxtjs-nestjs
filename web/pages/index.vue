<template>
  <v-row justify="center">
    <NewUser ref="newUser" />
    <v-col lg="8">
      <v-row>
        <v-col class="text-center">
          <h1>CRUD Assignment</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-right">
          <v-btn text small class="primary" @click="handleNewUserClick">
            <v-icon>
              mdi-plus
            </v-icon>
            New
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="users.length === 0">
        <v-col xs-12 class="text-center">
          <h3>Not found user.</h3>
        </v-col>
      </v-row>
      <v-row v-for="(user, index) in users" :key="index">
        <v-col>
          {{ user.email }}
        </v-col>
        <v-col class="text-right">
          <v-icon @click="handleEditClick(user.uuid)">
            mdi-account-edit
          </v-icon>
          <v-icon @click="handleDeleteClick(user.uuid)">
            mdi-delete
          </v-icon>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { get, call } from 'vuex-pathify'
import NewUser from '../components/NewUser'
import userApi from '../api/user'

export default {
  components: {
    NewUser
  },
  computed: {
    users: get('user/users')
  },
  async mounted () {
    await this.findAllUser()
  },
  methods: {
    findAllUser: call('user/findAllUser'),

    async handleNewUserClick () {
      await this.$refs.newUser.show()
      await this.findAllUser()
    },

    async handleEditClick (uuid) {
      await this.$refs.newUser.show(uuid)
      await this.findAllUser()
    },

    async handleDeleteClick (uuid) {
      await userApi.deleteUser(uuid)
      await this.findAllUser()
    }
  }
}
</script>
