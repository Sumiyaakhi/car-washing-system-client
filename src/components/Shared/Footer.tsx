import img from "../../assets/icons/spark_wash_Logo.png";

const Footer = () => {
  return (
    <div className="font-lora">
      <footer className="footer bg-sky-100 text-base-content p-10">
        <aside>
          <img src={img} alt="" />
          <p>
            GoWashMyCar is now servicing the entire <br /> Greater London area.
            Please contact us with any questions.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn text-white hover:bg-hover bg-primary join-item">
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>
      </footer>
    </div>
  );
};

export default Footer;
