<template>
  <div>
    <p>{{ $t("main.language") }}</p>
    <!--  <el-select v-model="value" placeholder="Select" @change="switchLocale">
      <el-option
        class="select"
        v-for="item in formatedItems"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span :class="item.class"></span>
      </el-option>
    </el-select> -->
    <el-select @change="switchLocale" placeholder="">
      <el-option
        v-for="item in formatedItems"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :class="item.class"
        ><span :class="item.class"></span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "LocaleSwitcher",

  data() {
    return {
      value: "",
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
              class: "spanFlagUk",
            }
          : {
              value: this.cities[1].value,
              class: "spanFlagRu",
            };
      });
    },
  },
  methods: {
    switchLocale(locale) {
      if (this.$i18n.locale !== locale) {
        this.$i18n.locale = locale;
        localStorage.setItem("localeLang", `${locale}`);
      }
    },
    select() {
      this.value = localStorage.getItem("localeLang") || "ua";
      return this.value === "ua" ? "spanFlagUk" : "spanFlagRu";
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
  content: "Ru";
  height: 42px;
  width: 100%;
  background-image: url(../assets/img/uk.png);
  background-repeat: no-repeat;
  background-position: left;
  background-size: contain;
  padding: 0px;
}
.spanFlagRu {
  display: block;
  content: "Ru";
  height: 42px;
  width: 100%;

  background-image: url(../assets/img/ru.png);
  background-repeat: no-repeat;
  background-position: left;
  background-size: contain;
  padding: 0px;
}
.select {
  display: flex;
  justify-content: space-between;
}
</style>
