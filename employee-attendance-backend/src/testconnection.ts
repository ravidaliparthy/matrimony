import pool from './connection'

async function testDB() {
  try {
    const [rows] = await pool.query('SELECT 1')
    console.log('✅ MySQL connection successful:', rows)
  } catch (error) {
    console.error('❌ MySQL connection failed:', error)
  } finally {
    process.exit()
  }
}

testDB()
