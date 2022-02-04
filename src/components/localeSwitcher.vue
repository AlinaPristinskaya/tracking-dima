<template>
  <div>
    <p>{{ $t("main.language") }}</p>
    <el-select
      v-model="value"
      placeholder="Select"
      @change="switchLocale(value)"
    >
      <el-option
        class="select"
        v-for="item in formatedItems"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span :class="item.class"></span>
        <span class="spanValue">{{ item.label }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "LocaleSwitcher",

  data() {
    return {
      locales: process.env.VUE_APP_I18N_SUPPORTED.split(","),
      cities: [
        {
          value: "ua",
          label: "UA",
        },
        {
          value: "ru",
          label: "RU",
        },
      ],
    };
  },
  computed: {
    formatedItems() {
      return this.locales.map((item) => {
        return item === this.cities[0].value
          ? {
              value: this.cities[0].value,
              label: this.cities[0].label,
              class: "spanFlagUk",
            }
          : {
              value: this.cities[1].value,
              label: this.cities[1].label,
              class: "spanFlagRu",
            };
      });
    },
  },
  methods: {
    switchLocale(locale) {
      if (this.$i18n.locale !== locale) {
        this.$i18n.locale = locale;
      }
    },
  },
};
</script>

<style scoped lang="scss">
li {
  text-decoration: underline;
  color: #459ce7;
  cursor: pointer;
}
.spanFlagUk {
  display: block;
  content: "Uk";
  height: 40px;
  width: 40px;
  background-image: url(../assets/img/uk.png);
  background-repeat: no-repeat;
  background-position: left;
  background-size: contain;
  color: black;
  padding: 0px;
}
.spanFlagRu {
  display: block;
  content: "Ru";
  height: 40px;
  width: 40px;
  background-image: url(../assets/img/ru.png);
  background-repeat: no-repeat;
  background-position: left;
  background-size: contain;
  color: black;
  padding: 0px;
}
.select {
  display: flex;
  justify-content: space-between;
}
.spanValue {
  text-decoration: none;
  display: block;
  color: black;
}
</style>
