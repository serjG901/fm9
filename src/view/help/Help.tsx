import upperFirstLetter from "../../helpers/upperFirstLetter";
import { TextesByLanguage } from "../../interfaces";
import FlexColumnCenter from "../../ui/atom/flex-column-center/FlexColumnCenter";
import Page from "../../ui/atom/page/Page";
import "./style.css";

export default function Help({ textes = {} }: TextesByLanguage) {
  return (
    <Page>
      <div className='help-view'>
        <FlexColumnCenter>
          <h1>{textes["help"] ? upperFirstLetter(textes["shelp"]) : "Help"}</h1>
          <hr />
          <div>
            <h2>
              {textes["about_app"]
                ? upperFirstLetter(textes["about_app"])
                : "About app"}
            </h2>
            <div>
              This is intuitive app for self manage your finance. All your data
              is saving in your device. This app not nedded to internet for
              work.
              <ul>
                <li>
                  Buys means your pays (costs) for grociers, services, items and
                  etc.
                </li>
                <li>
                  Pays means your incoming money like salary, gifts, credit
                  money and etc.
                </li>
                <li>
                  Debets means your debet account in bank (or somewere) or your
                  cash.
                </li>
                <li>
                  Credits means your credit acount in bank or your debts
                  someone.
                </li>
              </ul>
              <ul>
                In settings page you can:
                <li>set main color</li>
                <li>change language</li>
                <li>set default currency and add or delete currencies</li>
                <li>
                  change number of view items on Buys page and Pays page (this
                  affects the loading speed of these pages)
                </li>
                <li>manage your tags</li>
                <li>add new bases and to switch between bases</li>
                <li>
                  save your data in JSON or upload data from file (this can will
                  be needed if you want to transfer your data to another device)
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div>
            <h2>
              {textes["need_help"]
                ? upperFirstLetter(textes["need_help"])
                : "Need help"}
            </h2>
            <div>
              <p>
                If you have advice on this app or encounter an error - send me
                an email:
              </p>
              <a href='mailto:fm9developer@gmail.com'>fm9developer@gmail.com</a>
            </div>
          </div>
        </FlexColumnCenter>
      </div>
    </Page>
  );
}
