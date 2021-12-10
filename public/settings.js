import axios from "axios";
axios.defaults.baseURL = `https://${window.location.host}/f.tracking/`

/** Подставляем нужный url для запроса:
 * https://${window.location.host}/f.tracking/ (с получением текущего хоста. По умолчанию)

 * https://s5.vvtrack.com/f.tracking/ (с5)
 * https://s17.vvtrack.com/f.tracking/ (с17)
 * **/
