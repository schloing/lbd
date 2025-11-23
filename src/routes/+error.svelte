<script>
	import { page } from '$app/state';
</script>

<h1><span class="error">{page.status} - {page.error?.message}</span></h1>
<p>come back in a few minutes</p>
<p>problem still happening? <a href="https://github.com/schloing/lbd/issues/">report the bug</a></p>
<p>know how to fix it? <a href="https://github.com/TheCalculus/lbd/">fix the bug yourself here</a></p>
