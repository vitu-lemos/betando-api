import axios from "axios";
import environment from "../environment";

const BETANO_BASE_URL = environment.BETANO_BASE_URL;

const betanoInstance = axios.create({
  baseURL: `${BETANO_BASE_URL}`,
});

export default betanoInstance;
