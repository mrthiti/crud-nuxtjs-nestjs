<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    width="800"
  >
    <AlertBox ref="alertBox" />

    <v-card>
      <v-card-title class="headline grey lighten-2">
        {{ uuid ? 'Edit user' : 'New user'}}
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols="4">
                  <div class="mt-4">
                    <h3>ชื่อ:</h3>
                  </div>
                </v-col>
                <v-col cols="8">
                  <div>
                    <v-text-field
                      v-model="fName"
                      :rules="[rules.fName]"
                      single-line
                      outlined
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col cols="4">
                  <div class="mt-4">
                    <h3>นามสกุล:</h3>
                  </div>
                </v-col>
                <v-col cols="8">
                  <div>
                    <v-text-field
                      v-model="lName"
                      :rules="[rules.lName]"
                      single-line
                      outlined
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols="4">
                  <div class="mt-4">
                    <h3>ชื่อเล่น:</h3>
                  </div>
                </v-col>
                <v-col cols="8">
                  <div>
                    <v-text-field
                      v-model="nickName"
                      single-line
                      outlined
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col cols="4">
                  <div class="mt-4">
                    <h3>E-mail:</h3>
                  </div>
                </v-col>
                <v-col cols="8">
                  <div>
                    <v-text-field
                      v-model="email"
                      :rules="[rules.email]"
                      single-line
                      outlined
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols="4">
                  <div class="mt-4">
                    <h3>Password:</h3>
                  </div>
                </v-col>
                <v-col cols="8">
                  <div>
                    <v-text-field
                      v-model="password"
                      :rules="[rules.password]"
                      type="password"
                      single-line
                      outlined
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols="4">
                  <div class="mt-4">
                    <h3>Facebook:</h3>
                  </div>
                </v-col>
                <v-col cols="8">
                  <div>
                    <v-text-field
                      v-model="facebook"
                      single-line
                      outlined
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col cols="4">
                  <div class="mt-4">
                    <h3>Twitter:</h3>
                  </div>
                </v-col>
                <v-col cols="8">
                  <div>
                    <v-text-field
                      v-model="twitter"
                      single-line
                      outlined
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols="4">
                  <div class="mt-4">
                    <h3>Line:</h3>
                  </div>
                </v-col>
                <v-col cols="8">
                  <div>
                    <v-text-field
                      v-model="line"
                      single-line
                      outlined
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col cols="4">
                  <div class="mt-4">
                    <h3>Youtube:</h3>
                  </div>
                </v-col>
                <v-col cols="8">
                  <div>
                    <v-text-field
                      v-model="youtube"
                      single-line
                      outlined
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols="4">
                  <div class="mt-4">
                    <h3>Website:</h3>
                  </div>
                </v-col>
                <v-col cols="8">
                  <div>
                    <v-text-field
                      v-model="website"
                      single-line
                      outlined
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="handleSaveClick"
        >
          Save
        </v-btn>

        <v-btn
          color="primary"
          text
          @click="handleCancelClick"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { sha256 } from 'js-sha256'
import userApi from '../api/user'
import AlertBox from '../components/AlertBox'

export default {
  components: {
    AlertBox
  },
  data () {
    return {
      dialog: false,
      callback: null,
      uuid: null,
      fName: '',
      lName: '',
      nickName: '',
      email: '',
      password: '',
      facebook: '',
      twitter: '',
      line: '',
      youtube: '',
      website: '',
      rules: {
        fName: (value) => {
          return !!value || 'กรุณาใส่ข้อมูล'
        },
        lName: (value) => {
          return !!value || 'กรุณาใส่ข้อมูล'
        },
        email: (value) => {
          return (!!value && this.validateEmail(value)) || 'กรุณาใส่ข้อมูล Email ให้ถูกต้อง'
        },
        password: (value) => {
          return !!this.uuid || !!value || 'กรุณาใส่ข้อมูล'
        }
      }
    }
  },
  methods: {
    async show (uuid) {
      this.uuid = uuid
      this.fName = ''
      this.lName = ''
      this.nickName = ''
      this.email = ''
      this.password = ''
      this.facebook = ''
      this.twitter = ''
      this.line = ''
      this.youtube = ''
      this.website = ''

      if (this.uuid) {
        const { error: errorFindUser, data: responseFindUser } = await userApi.findUser(this.uuid)

        if (errorFindUser) {
          await this.$refs.alertBox.showAlert(responseFindUser.data.message, { typeAlertBox: 'error' })
          return
        }

        this.fName = responseFindUser.fName
        this.lName = responseFindUser.lName
        this.nickName = responseFindUser.nickName
        this.email = responseFindUser.email
        this.facebook = responseFindUser.facebook
        this.twitter = responseFindUser.twitter
        this.line = responseFindUser.line
        this.youtube = responseFindUser.youtube
        this.website = responseFindUser.website
      }

      return new Promise((resolve, reject) => {
        this.callback = resolve
        this.dialog = true
      })
    },

    async handleSaveClick () {
      if (!this.$refs.form.validate()) {
        await this.$refs.alertBox.showAlert('Please complete all information.', { typeAlertBox: 'error', title: 'Error' })
        return
      }

      const user = {
        fName: this.fName,
        lName: this.lName,
        nickName: this.nickName,
        email: this.email,
        password: this.password ? sha256(this.password) : this.password,
        facebook: this.facebook,
        twitter: this.twitter,
        line: this.line,
        youtube: this.youtube,
        website: this.website
      }

      if (this.uuid) {
        const { error: errorAddUser } = await userApi.updateUser(this.uuid, user)

        if (errorAddUser) {
          await this.$refs.alertBox.showAlert(errorAddUser.data.message, { typeAlertBox: 'error', title: 'Error' })
          return
        }
      } else {
        const { error: errorAddUser } = await userApi.addUser(user)

        if (errorAddUser) {
          await this.$refs.alertBox.showAlert(errorAddUser.data.message, { typeAlertBox: 'error', title: 'Error' })
          return
        }
      }

      this.dialog = false
      this.callback()
    },

    handleCancelClick () {
      this.dialog = false
      this.callback()
    },

    validateEmail (email) {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }
  }
}
</script>

<style>

</style>
