import React from 'react'
import { Surface } from 'react-native-paper'

import { styles } from '@/lib/ui'
import { Image } from 'expo-image'
import { Formik } from 'formik'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import * as Yup from 'yup'

import Locales from '@/lib/locales'
const TabsHome = () => (
  <Surface style={styles.screen}>
    <Image
      alt="Logo"
      source={require('@/assets/images/logo.svg')}
      style={{
        height: 150,
        width: 150,
        borderRadius: 16,
        marginBottom: 32,
        marginHorizontal: 'auto',
      }}
    />

    <Text variant="headlineLarge" style={{ textAlign: 'center' }}>
      {Locales.t('welcome')}
    </Text>
    <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
      {Locales.t('messageWelcome')}
    </Text>

    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => console.log(values)}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .min(3, 'Too Short!')
          .max(64, 'Too Long!')
          .required('Please enter a username.'),
        password: Yup.string()
          .min(8, 'Too Short! must be at least 8 characters.')
          .max(64, 'Too Long!')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            'Must 1 uppercase, 1 lowercase, 1 number and 1 special case character',
          )
          .required('Please enter a password'),
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <>
          <Surface elevation={0}>
            <TextInput
              maxLength={64}
              mode="outlined"
              label={Locales.t('username')}
              value={values.username}
              error={!!errors.username}
              onBlur={handleBlur('username')}
              right={64 - values.username.length}
              placeholder="Enter your username..."
              onChangeText={handleChange('username')}
            />
            <HelperText type="error" visible={!!errors.username}>
              {errors.username}
            </HelperText>
          </Surface>

          <Surface elevation={0}>
            <TextInput
              maxLength={64}
              mode="outlined"
              label={Locales.t('password')}
              value={values.password}
              error={!!errors.password}
              onBlur={handleBlur('password')}
              right={64 - values.password.length}
              placeholder="Enter your password..."
              onChangeText={handleChange('password')}
            />
            <HelperText type="error" visible={!!errors.password}>
              {errors.password}
            </HelperText>
          </Surface>

          <Button mode="contained" onPress={() => handleSubmit()}>
            Login
          </Button>
        </>
      )}
    </Formik>
  </Surface>
)

export default TabsHome
