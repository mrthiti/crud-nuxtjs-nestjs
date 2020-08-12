<template>
  <v-dialog v-model="alert" persistent max-width="500">
    <v-card>
      <v-card-title :class="`headline ${themeColor} white--text`">
        <v-icon x-large dark>
          {{ icon }}
        </v-icon>{{ title }}
      </v-card-title>

      <v-card-text class="mt-3 text-center">
        <h3>{{ text }}</h3>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn :color="themeColor" @click="handleSubmitClick">
          {{ buttonOK }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'AlertBox',
  data () {
    return {
      alert: false,
      title: '',
      text: '',
      typeAlertBox: '',
      callback: null,
      buttonOK: ''
    }
  },
  computed: {
    themeColor () {
      if (this.typeAlertBox === 'success') { return this.typeAlertBox }
      if (this.typeAlertBox === 'warning') { return this.typeAlertBox }
      if (this.typeAlertBox === 'error') { return this.typeAlertBox }

      return 'success'
    },
    icon () {
      if (this.typeAlertBox === 'success') { return 'mdi-check-circle' }
      if (this.typeAlertBox === 'warning') { return 'mdi-alert' }
      if (this.typeAlertBox === 'error') { return 'mdi-alert-circle' }

      return 'mdi-check-circle'
    }
  },
  methods: {
    showAlert (text, { typeAlertBox, title, buttonOK } = {}) {
      this.title = title || ''
      this.text = text || ''
      this.typeAlertBox = typeAlertBox || 'success'
      this.buttonOK = buttonOK || 'close'
      this.alert = true

      return new Promise((resolve, reject) => {
        this.callback = resolve
      })
    },
    handleSubmitClick () {
      this.alert = false
      this.callback()
    }
  }
}
</script>
