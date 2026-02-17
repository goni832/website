#!/usr/bin/env bash
python3 - <<'PY'
import http.server, socketserver

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # tell browsers not to cache anything
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

PORT = 8000
with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
    print(f"serving with no-cache headers on port {PORT}")
    httpd.serve_forever()
PY
