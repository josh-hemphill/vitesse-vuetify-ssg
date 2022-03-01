<script setup lang="ts">
import { mdiTent } from '@mdi/js';
import { useUserStore } from '~/stores/user';
const { t } = useI18n();
const user = useUserStore();
const name = toRef(user, 'savedName');

const router = useRouter();
const go = () => {
	if (name.value) {
		user.setNewName(name.value);
		router.push(`/about#${encodeURIComponent(name.value)}`);
	}
};
</script>

<template>
  <div>
    <p class="text-4xl">
      <v-icon
        :icon="mdiTent"
        class="inline-block"
      />
    </p>
    <p>
      <a
        rel="noreferrer"
        href="https://github.com/antfu/vitesse"
        target="_blank"
      >
        Vitesse
      </a>
    </p>
    <p>
      <em class="text-sm opacity-75">{{ t('s.intro.desc') }}</em>
    </p>

    <div class="py-4" />

    <v-text-field
      id="input"
      v-model="name"
      :label="t('s.intro.whats-your-name')"
      :placeholder="t('s.intro.whats-your-name')"
      dense
      autocomplete="false"
      text="center"
      @keydown.enter="go"
    />

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
        v-text="t('s.button.go')"
      />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
