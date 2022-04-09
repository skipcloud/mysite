import { NextResponse } from "next/server";

// My old site (RIP) used /YYYY/MM/DD/<title> as the path so
// to ensure the old links continue to work just gently rewrite
// the URL to point to the new /posts/<title> path
//
// Some old posts have commas, colons, and question marks in the
// title so remove them too
export function middleware(request) {
  // match '/YYYY/MM/DD/<post-title>'
  const oldPostPath = /^\/\d{4}(\/\d{2}){2}\//
  let { pathname } = request.nextUrl

  // remove problematic punctuation from title
  pathname = pathname.replaceAll(/[,:?]/g, '')

  if (oldPostPath.test(pathname)) {
    // if it's an old post then send them to the new url
    const url = request.nextUrl.clone()
    url.pathname = `posts/${pathname.replace(oldPostPath, '')}`
    const resp = NextResponse.redirect(url, 301)

    return resp
  }
}
