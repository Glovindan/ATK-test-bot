const {Pool} = require('pg')

const pool = new Pool();

class DataBase {
  async createUser(tgId) {
    const user = await pool.query(`
      SELECT * FROM public.user WHERE "tgId" = '${tgId}';
    `)

    if(!user.rows.length) {
      await pool.query(`
        INSERT INTO public.user("tgId") VALUES(${tgId});
      `)
    }

    return null
  }

  async deleteUser(tgId) {
    const status = await pool.query(`
       DELETE FROM public.user WHERE "tgId" = '${tgId}';
    `)

    return status;
  }

  async getUsersList() {
    const users = await pool.query(`
        SELECT * FROM public.user;
    `)

    return users
  }
}

module.exports = new DataBase();