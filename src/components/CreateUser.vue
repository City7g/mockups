<script setup>
import { onMounted, reactive, ref } from 'vue'
import { instance } from '../helper/instance'
import BaseInput from './Base/BaseInput.vue'
import BasePhone from './Base/BasePhone.vue'
import BaseRadio from './Base/BaseRadio.vue'
import BaseFile from './Base/BaseFile.vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, minValue, helpers } from '@vuelidate/validators'
import { useUsersStore } from '../stores/user.js'
const userStore = useUsersStore()

const listPositions = ref(null)

onMounted(async () => {
  const res = await instance.get('/positions')
  listPositions.value = res.data.positions
})

// Validation
const checkFormatImage = value => /[jpg,jpeg]$/.test(value)
const checkPhoneNumber = value => /^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/.test(value)

const data = reactive({
  name: '',
  email: '',
  phone: '',
  photo: '',
  position: null
})

const rules = {
  name: { required, minLength: minLength(2), maxLength: maxLength(60) },
  email: { required, maxLength: maxLength(100), email },
  phone: { required, checkPhoneNumber: helpers.withMessage('No currect phone', checkPhoneNumber) },
  photo: { required, checkFormatImage: helpers.withMessage('Image must by jpg or jpeg', checkFormatImage) },
  position: { required, minValue: minValue(1) }
}

const v$ = useVuelidate(rules, data)

// Create User
const form = ref(null)
const isFormSend = ref(false)
const sendError = ref(null)

const sendForm = async () => {
  const result = await v$.value.$validate()

  if (result) {
    const formData = new FormData(form.value)
    formData.set('phone', formData.get('phone').replace(/[ ,(,),-]/g, ''))
    try {
      await userStore.createUser(formData)
      isFormSend.value = true
    } catch (err) {
      sendError.value = err
      setTimeout(() => {
        sendError.value = null
      }, 3000);
    }
  }
}
</script>

<template>
  <div class="section-send">
    <div class="container">
      <template v-if="!isFormSend">
        <h2 class="title-h1 section-send__title">Working with POST request</h2>

        <form ref="form" @submit.prevent="sendForm" novalidate class="form-main">
          <BaseInput class="form-main__input" placeholder="Your name" v-model="data.name" name="name"
            :error="v$.name.$error ? v$.name.$errors[0].$message : null" />

          <BaseInput class="form-main__input" placeholder="Email" v-model="data.email" type="email" name="email"
            :error="v$.email.$error ? v$.email.$errors[0].$message : null" />

          <BasePhone class="form-main__input" placeholder="Phone" v-model="data.phone" type="tel" name="phone"
            :error="v$.phone.$error ? v$.phone.$errors[0].$message : null" helperText="+38 (XXX) XXX - XX - XX" />

          <BaseRadio class="form-main__radio" :options="listPositions" v-model="data.position" name="position_id"
            :error="v$.position.$error ? v$.position.$errors[0].$message : null" />

          <BaseFile class="form-main__file" v-model="data.photo" name="photo"
            :error="v$.photo.$error ? v$.photo.$errors[0].$message : null" />

          <BaseButton class="form-main__btn" type="submit" text="Sign up" :disabled="v$.$silentErrors.length || sendError" />

          <p class="section-send__error">{{ sendError }}</p>
        </form>
      </template>
      <template v-else>
        <h2 class="title-h1 section-send__title">User successfully registered</h2>

        <img src="@/assets/success-image.svg" alt="" class="section-send__img">
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.section-send {
  margin: 100px 0;

  &__title {
    margin-bottom: 50px;
    text-align: center;
  }

  &__img {
    display: flex;
    margin: 0 auto;
  }

  &__error {
    margin-top: 20px;
    text-align: center;
    color: $error;
  }
}

.form-main {
  max-width: 380px;
  margin: 0 auto;

  &__input {
    margin-top: 50px;
  }

  &__radio {
    margin-top: 47px;
  }

  &__file {
    margin-top: 47px;
  }

  &__btn {
    display: block;
    margin: 50px auto 0;
  }
}
</style>