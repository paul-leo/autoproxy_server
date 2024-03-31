let AIRPORTURLS = process.env.AIRPORTURLS;
try {
  AIRPORTURLS = JSON.parse(AIRPORTURLS);
} catch (error) {
  AIRPORTURLS = []
}
export default AIRPORTURLS;

