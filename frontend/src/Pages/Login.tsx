const LoginPage = () => {
  return (
    <div className="container">
      <div className="form-group">
        <label>Username / Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <div className="form-group">
        <button>Submit</button>
      </div>
    </div>
  )
}

export default LoginPage;