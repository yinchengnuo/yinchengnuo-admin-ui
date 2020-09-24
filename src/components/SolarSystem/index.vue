<template>
  <div class="universe">
    <div class="solarsystem" @click="move">
      <img class="sun" src="@/assets/solar_system_images/sun.png">
      <div v-for="(item, index) in list" :key="index" class="orbit-wrapper">
        <div class="orbit" :class="item.class">
          <div class="planet">
            <div class="ball">
              <img :src="item.img">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: '水星', class: 'mercury', img: require('@/assets/solar_system_images/mercury.png') },
        { name: '金星', class: 'venus', img: require('@/assets/solar_system_images/venus.png') },
        { name: '地球', class: 'earth', img: require('@/assets/solar_system_images/earth.png') },
        { name: '火星', class: 'mars', img: require('@/assets/solar_system_images/mars.png') },
        { name: '木星', class: 'jupiter', img: require('@/assets/solar_system_images/jupiter.png') },
        { name: '土星', class: 'saturn', img: require('@/assets/solar_system_images/saturn.png') },
        { name: '天王星', class: 'uranus', img: require('@/assets/solar_system_images/uranus.png') },
        { name: '海王星', class: 'neptune', img: require('@/assets/solar_system_images/neptune.png') },
        { name: '冥王星', class: 'pluto', img: require('@/assets/solar_system_images/pluto.png') }
      ]
    }
  },
  methods: {
    move(e) {
      // if (Array.from(e.target.classList).includes('planet')) {
      //   console.log(e.target)
      // }
      console.log(e.target)
    }
  }
}
</script>

<style lang="scss" scoped>
.universe {
  height: 100%;
  background: url("../../assets/solar_system_images/universe.png") no-repeat center center;
  .solarsystem {
    width: 100%;
    height: 100%;
    position: relative;
    // perspective: 1000px;
    // perspective-origin: 50% 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d !important;
    .sun {
      width: 150px;
      height: 150px;
    }
    .orbit-wrapper {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      position: absolute;
      align-items: center;
      justify-content: center;
    }
  }
}

.orbit {
  border-radius: 50%;
  border: 1px solid #ffffff;
  transform-style: preserve-3d !important;
  animation: orbitrotate 10s linear 0s normal none infinite;
  .planet {
    left: 0;
    top: 50%;
    transition: all .5s;
    position: absolute;
    transform-style: preserve-3d !important;
    transform:  rotateX(-90deg) rotateY(0deg) translateX(-50%);
    .ball {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      color: #ffffff;
      position: absolute;
      white-space: nowrap;
      align-items: center;
      justify-content: center;
      background-size: 100% 100%;
      transform-origin: 50% 50% 0;
      background-repeat: no-repeat;
      background-position: center center;
      transform: rotateX(-90deg) rotateY(0deg);
      animation: planetrotate 10s linear 0s normal none infinite;
      img {
        z-index: -1;
        width: 100%;
        height: 100%;
        position: absolute;
      }
      span {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

@keyframes orbitrotate {
  0% {
    transform: rotateX(75deg) rotateY(-10deg) rotateZ(0deg);
  }

  100% {
    transform: rotateX(75deg) rotateY(-10deg) rotateZ(-360deg);
  }
}

@keyframes planetrotate {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(-360deg);
  }
}

.mercury {
  --duration: 3;
  width: 180px;
  height: 180px;
  animation-duration: calc(var(--duration) * 1s);
  .planet {
    width: 20px;
    height: 20px;
    .ball {
      animation-duration: calc(var(--duration) * 1s);
    }
  }
}

.venus {
  --duration: 9;
  width: 260px;
  height: 260px;
  animation-duration: calc(var(--duration) * 1s);
  .planet {
    width: 30px;
    height: 30px;
    .ball {
      animation-duration: calc(var(--duration) * 1s);
    }
  }
}

.earth {
  --duration: 12;
  width: 340px;
  height: 340px;
  animation-duration: calc(var(--duration) * 1s);
  .planet {
    width: 30px;
    height: 30px;
    .ball {
      animation-duration: calc(var(--duration) * 1s);
    }
  }
}

.mars {
  --duration: 20;
  width: 420px;
  height: 420px;
  animation-duration: calc(var(--duration) * 1s);
  .planet {
    width: 24px;
    height: 24px;
    .ball {
      animation-duration: calc(var(--duration) * 1s);
    }
  }
}

.jupiter {
  --duration: 50;
  width: 540px;
  height: 540px;
  animation-duration: calc(var(--duration) * 1s);
  .planet {
    width: 60px;
    height: 60px;
    .ball {
      animation-duration: calc(var(--duration) * 1s);
    }
  }
}

.saturn {
  --duration: 60;
  width: 660px;
  height: 660px;
  animation-duration: calc(var(--duration) * 1s);
  .planet {
    width: 122px;
    height: 70px;
    .ball {
      animation-duration: calc(var(--duration) * 1s);
    }
  }
}

.uranus {
  --duration: 70;
  width: 780px;
  height: 780px;
  animation-duration: calc(var(--duration) * 1s);
  .planet {
    width: 40px;
    height: 40px;
    .ball {
      animation-duration: calc(var(--duration) * 1s);
    }
  }
}

.neptune {
  --duration: 80;
  width: 900px;
  height: 900px;
  animation-duration: calc(var(--duration) * 1s);
  .planet {
    width: 38px;
    height: 38px;
    .ball {
      animation-duration: calc(var(--duration) * 1s);
    }
  }
}

.pluto {
  --duration: 100;
  width: 1000px;
  height: 1000px;
  animation-name: plutorotate;
  animation-duration: calc(var(--duration) * 1s);
  .planet {
    width: 20px;
    height: 20px;
    .ball {
      animation-duration: calc(var(--duration) * 1s);
    }
  }
}

@keyframes plutorotate {
  0% {
    transform: rotateX(75deg) rotateY(-25deg) rotateZ(0deg);
  }

  100% {
    transform: rotateX(75deg) rotateY(-25deg) rotateZ(-360deg);
  }
}
</style>
