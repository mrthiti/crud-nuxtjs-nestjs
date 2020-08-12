<template>
  <v-row justify="center">
    <NewUser ref="newUser" />
    <UserDetail ref="userDetail" />
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
      <v-row v-if="!loading && users.length === 0">
        <v-col xs-12 class="text-center">
          <h3>Not found user.</h3>
        </v-col>
      </v-row>
      <v-row v-if="loading">
        <v-col xs-12 class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          />
        </v-col>
      </v-row>
      <v-row v-for="(user, index) in (!loading ? users : [])" :key="index">
        <v-col>
          <a @click="handleShowDetailClick(user.uuid)">{{ user.email }}</a>
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
import UserDetail from '../components/UserDetail'
import userApi from '../api/user'

export default {
  components: {
    NewUser,
    UserDetail
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    users: get('user/users')
  },
  async mounted () {
    this.loading = true
    await this.findAllUser()
    this.loading = false
  },
  methods: {
    findAllUser: call('user/findAllUser'),

    async handleNewUserClick () {
      await this.$refs.newUser.show()
      this.loading = true
      await this.findAllUser()
      this.loading = false
    },

    async handleEditClick (uuid) {
      await this.$refs.newUser.show(uuid)
      this.loading = true
      await this.findAllUser()
      this.loading = false
    },

    async handleDeleteClick (uuid) {
      await userApi.deleteUser(uuid)
      this.loading = true
      await this.findAllUser()
      this.loading = false
    },

    async handleShowDetailClick (uuid) {
      await this.$refs.userDetail.show(uuid)
    }
  }
}
</script>
