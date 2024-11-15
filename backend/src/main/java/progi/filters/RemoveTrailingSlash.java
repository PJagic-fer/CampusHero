package progi.filters;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import org.springframework.stereotype.Component;
import java.io.IOException;
import org.springframework.util.StringUtils;


@Component
public  class RemoveTrailingSlash implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequestWrapper requestWrapper = new HttpServletRequestWrapper((HttpServletRequest) request) {
            @Override
            public String getRequestURI() {
                String requestURI = super.getRequestURI();
                if (StringUtils.endsWithIgnoreCase(requestURI, "/")) {
                    return StringUtils.trimTrailingCharacter(requestURI, '/');
                }
                return requestURI;
            }
        };
        chain.doFilter(requestWrapper, response);
    }
}
