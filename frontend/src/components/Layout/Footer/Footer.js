import React from "react";
class Footer extends React.Component {
  render() {
    return(
      <footer className="container mx-auto bg-white py-8 border-t border-gray-400 bottom-0">
        <div className="container flex px-3 py-8 ">
          <div className="w-full mx-auto flex flex-wrap">
            <div className="flex w-full lg:w-1/2 ">
              <div className="px-3 md:px-0">
                <h3 className="font-bold text-gray-900">About</h3>
                <p className="py-4">
                  BSSE 22-9 Final Year Project
                </p>
              </div>
            </div>
            <div className="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
              <div className="px-3 md:px-0">
                <h3 className="font-bold text-gray-900">Social</h3>
                <ul className="list-reset items-center pt-3">
                  <li>
                    <a className="inline-block no-underline hover:text-black hover:underline py-1" href="#">Add social links</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;