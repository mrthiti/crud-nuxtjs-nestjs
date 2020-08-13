<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    width="600"
  >
    <AlertBox ref="alertBox" />

    <v-card>
      <v-card-title class="headline grey lighten-2">
        User detail
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="4">
            <h3>ซื่อ:</h3>
          </v-col>
          <v-col cols="8">
            <h3>{{ `${fName} ${lName}` }} {{ nickName ? `(${nickName})` : "" }}</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <h3>Email:</h3>
          </v-col>
          <v-col cols="8">
            <h3>{{ email }}</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <h3>Facebook:</h3>
          </v-col>
          <v-col cols="8">
            <h3>{{ facebook || "-" }}</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <h3>Twitter:</h3>
          </v-col>
          <v-col cols="8">
            <h3>{{ twitter || "-" }}</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <h3>Line:</h3>
          </v-col>
          <v-col cols="8">
            <h3>{{ line || "-" }}</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <h3>Youtube:</h3>
          </v-col>
          <v-col cols="8">
            <h3>{{ youtube || "-" }}</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <h3>Website:</h3>
          </v-col>
          <v-col cols="8">
            <h3>{{ website || "-" }}</h3>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="handleCloseClick"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import userApi from '../api/user'
import AlertBox from '../components/AlertBox'

export default {
  components: {
    AlertBox
  },
  data () {
    return {
      dialog: false,
      fName: '',
      lName: '',
      nickName: '',
      email: '',
      password: '',
      facebook: '',
      twitter: '',
      line: '',
      youtube: '',
      website: ''
    }
  },
  methods: {
    async show (uuid) {
      const { error: errorFindUser, data: responseFindUser } = await userApi.findUser(uuid)

      if (errorFindUser) { return }

      this.fName = responseFindUser.fName
      this.lName = responseFindUser.lName
      this.nickName = responseFindUser.nickName
      this.email = responseFindUser.email
      this.facebook = responseFindUser.facebook
      this.twitter = responseFindUser.twitter
      this.line = responseFindUser.line
      this.youtube = responseFindUser.youtube
      this.website = responseFindUser.website

      this.dialog = true
    },

    handleCloseClick () {
      this.dialog = false
    }
  }
}
</script>
