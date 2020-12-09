import { useState, useCallback, useRef } from 'react'
import Layout from '../../components/layout'
import Button from '../../components/button'
import MePageLayout from '../../components/me-page-layout'
import ManagedForm from '../../components/form'
import FormField from '../../components/form-field'
import StyledInput from '../../components/styled-input'
import ProfilePictureUpload from '../../components/profile-picture-upload'
import { getCloudinaryUrl } from '../../util/misc'
import { getProfile, getCurrentUid, updateProfile } from '../../core/auth'
import { cloudinaryUpload } from '../../core/media'

export default function MeProfilePage() {
  const [state, setState] = useState({ loading: false, success: false, error: null })
  const initialProfileFormValue = useRef(
    getProfile(getCurrentUid()).then(profile => {
      let avatar = null

      if (profile.avatar != null) {
        avatar = {
          id: profile.avatar,
          url: getCloudinaryUrl(profile.avatar),
        }
      }

      return {
        avatar,
        fullname: profile.fullname,
        username: profile.username,
        bio: profile.bio || '',
      }
    })
  )

  const handleSubmit = useCallback(async (formValue) => {
    setState({
      ...state,
      loading: true,
      error: null,
    })

    try {
      let payload = { ...formValue }

      if (payload.avatar?.file != null) {
        let avatarRes = await cloudinaryUpload(payload.avatar.file)
        payload.avatar = avatarRes.public_id
      } else {
        delete payload.avatar;
      }

      await updateProfile(getCurrentUid(), payload)
      setState({
        ...state,
        loading: false,
        success: true,
      })
    } catch(err) {
      console.log(err);
      setState({
        ...state,
        loading: false,
        error: err.message,
      })
    }
  })

  /**
   * @param {(payload: object) => any} _updateFieldState
   */
  const handleAvatarReset = (_updateFieldState) => {
    return () => _updateFieldState({
      id: 'avatar',
      value: null
    })
  }

  /**
   * Handle `ProfilePictureUpload` change as `ManagedForm` field change
   * @param {(payload: object) => any} _updateFieldState
   */
  const handleAvatarChange = (_updateFieldState) => {
    return event => {
      _updateFieldState({
        id: 'avatar',
        value: {
          id: null,
          url: event.url,
          file: event.file
        }
      })
    }
  }

  return (
    <Layout>
      <MePageLayout>
        <div className="card-header pt-0">
          <h1 className="text-3xl text-indigo-500">Profile</h1>
        </div>
        <ManagedForm
          onSubmit={handleSubmit}
          initialValue={{ fullname: '', username: '', bio: '', avatar: null }}
          initialValueAsync={initialProfileFormValue.current}
          className="w-full max-w-sm md:ml-10 mt-4">
        {({ value: formValue, controls }, updateFieldState) => (<>
          <FormField>
            <label className="flex justify-between mb-2 items-center">
              <span className="text-sm text-gray-500">Profile picture</span>
              <Button onClick={handleAvatarReset(updateFieldState)} type="button" kind="clear" className="py-1 px-2 text-sm text-gray-500">&times; Reset</Button>
            </label>
            <ProfilePictureUpload
              id="avatar"
              data={formValue.avatar}
              onChange={handleAvatarChange(updateFieldState)} />
          </FormField>
          <FormField label="Full name" labelFor="fullname">
            <StyledInput>
              <input value={formValue.fullname} onChange={updateFieldState} id="fullname" type="text" autoComplete="name" />
            </StyledInput>
          </FormField>
          <FormField label="Username" labelFor="username">
            <StyledInput>
              <input value={formValue.username} onChange={updateFieldState} id="username" type="text" autoComplete="username" />
            </StyledInput>
          </FormField>
          <FormField label="Bio" labelFor="bio">
            <StyledInput>
              <textarea value={formValue.bio} onChange={updateFieldState} id="bio" className="textarea" rows="3" />
            </StyledInput>
          </FormField>

          <div className="flex justify-end">
            <Button loading={state.loading}>Save</Button>
          </div>
        </>)}
        </ManagedForm>
      </MePageLayout>
    </Layout>
  )
}
