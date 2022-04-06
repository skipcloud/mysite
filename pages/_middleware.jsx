import { NextResponse } from "next/server";

// My old site (RIP) used /YYYY/MM/DD/<title> as the path so
// to ensure the old links continue to work just gently rewrite
// the URL to point to the new /posts/<title> path
export function middleware(request) {
  // match '/YYYY/MM/DD/<post-title>'
  const oldPostPath = /^\/\d{4}(\/\d{2}){2}\/(\w+)/
  const { pathname } = request.nextUrl
  
  if (oldPostPath.test(pathname)) {
    // const postName = pathname.match(oldPostPath)[2]
    const url = request.nextUrl.clone()
    url.pathname = '/posts/hello-world'
    const resp = NextResponse.redirect(url, 301)

    return resp
  }
}
