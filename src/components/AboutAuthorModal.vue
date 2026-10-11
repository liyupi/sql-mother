<template>
  <a-modal
    v-model:visible="visible"
    :title="t('aboutAuthor')"
    :footer="null"
    width="400px"
    centered
    @cancel="handleClose"
  >
    <div class="about-content">
      <div class="author-intro">
        <h3>👨‍💻 {{ t("authorName") }}</h3>
        <p>{{ t("authorIntro") }}</p>
      </div>
      
      <div class="benefits-section">
        <h4>🎁 {{ t("authorResourcesTitle") }}</h4>
        <p class="benefits-text">{{ t("authorResources") }}</p>
      </div>

      <div class="qrcode-section">
        <div class="qrcode-container">
          <img 
            :src="qrcodeUrl" 
            :alt="t('authorQrAlt')"
            class="qrcode-image"
          />
          <p class="qrcode-text">{{ t("authorQrCaption") }}</p>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import qrcodeImage from '../assets/qrcode-mpcoder_yupi.jpg';
import { t } from "../i18n";

interface Props {
  visible: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false
});

const emit = defineEmits(['update:visible']);

const visible = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:visible', value)
});

const qrcodeUrl = ref(qrcodeImage);

const handleClose = () => {
  visible.value = false;
};
</script>

<style scoped>
.about-content {
  padding: 0;
}

.author-intro {
  margin-bottom: 16px;
}

.author-intro h3 {
  margin-bottom: 8px;
  font-size: 15px;
}

.author-intro p {
  color: #666;
  line-height: 1.5;
  margin: 0;
  font-size: 14px;
}

.benefits-section {
  margin-bottom: 16px;
}

.benefits-section h4 {
  margin-bottom: 8px;
  font-size: 15px;
}

.benefits-text {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
}

.qrcode-section {
  text-align: center;
}

.qrcode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qrcode-image {
  width: 160px;
  height: 160px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  object-fit: cover;
}

.qrcode-text {
  margin-top: 8px;
  color: #666;
  font-size: 13px;
}

@media (max-width: 768px) {
  .about-content {
    padding: 0 8px;
  }
  
  .qrcode-image {
    width: 140px;
    height: 140px;
  }
}
</style>
