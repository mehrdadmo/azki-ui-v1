# Architecture rules
- Keep Azki insurance report types and labels in dedicated shared modules; intake, review, and exports must use the same report structure.
- Process CSV records locally and leave document authenticity and unavailable reconciliation evidence unverified; external verification is not connected.
- Keep case state in the existing session-only React context until persistent storage is explicitly implemented; do not imply uploaded documents are saved remotely.
- Generate Excel workbooks from report data in the browser, with national IDs as text and RTL worksheets; downloads must contain the same reviewed values as the page.