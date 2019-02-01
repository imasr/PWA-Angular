import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VersionCheckService {


  private currentHash = "{{POST_BUILD_ENTERS_HASH_HERE}}"

  constructor(private http: HttpClient) {

  }

  /**
   * Checks in every set frequency the version of frontend application
   * @param url
   * @param {number} frequency - in milliseconds, defaults to 30 minutes
   */
  public initVersionCheck(url, frequency = 1000 * 60 * 2) {
    setInterval(() => {
      this.checkVersion(url)
        .pipe(first())
        .subscribe(
          (response: any) => {
            const hash = response.hash;
            console.log("response =>", hash)
            const hashChanged = this.hasHashChanged(this.currentHash, hash);

            // If new version, do something
            if (hashChanged) {
              // ENTER YOUR CODE TO DO SOMETHING UPON VERSION CHANGE
              alert('Update latest version of app')
              location.reload();
            }
            // store the new hash so we wouldn't trigger versionChange again
            // only necessary in case you did not force refresh
            this.currentHash = hash;
          },
          (err) => {
            console.error(err, 'Could not get version');
          }
        );
    }, frequency);
  }

  /**
   * Will do the call and check if the hash has changed or not
   * @param url
   */
  private checkVersion(url) {
    return this.http.get(url + '?t=' + new Date().getTime())

  }

  /**
   * Checks if hash has changed.
   * This file has the JS hash, if it is a different one than in the version.json
   * we are dealing with version change
   * @param currentHash
   * @param newHash
   * @returns {boolean}
   */
  private hasHashChanged(currentHash, newHash) {
    if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
      return false;
    }

    return currentHash !== newHash;
  }

}
