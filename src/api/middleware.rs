use poem::{http::HeaderValue, Endpoint, Middleware, Request, Result};

pub struct CookieToTokenMiddleware;

/// The new endpoint type generated by the TokenMiddleware.
pub struct CookieToTokenMiddlewareImpl<E> {
    ep: E,
}

impl<E: Endpoint> Middleware<E> for CookieToTokenMiddleware {
    type Output = CookieToTokenMiddlewareImpl<E>;

    fn transform(&self, ep: E) -> Self::Output {
        CookieToTokenMiddlewareImpl { ep }
    }
}

#[poem::async_trait]
impl<E: Endpoint> Endpoint for CookieToTokenMiddlewareImpl<E> {
    type Output = E::Output;

    async fn call(&self, mut req: Request) -> Result<Self::Output> {
        if req.header("UNDERWORLD-TOKEN").is_none() {
            if let Some(cookie) = req.cookie().get("underworldToken") {
                let token = cookie.value_str().to_string();
                req.headers_mut()
                    .append("UNDERWORLD-TOKEN", HeaderValue::from_str(&token).unwrap());
            }
        }

        self.ep.call(req).await
    }
}
