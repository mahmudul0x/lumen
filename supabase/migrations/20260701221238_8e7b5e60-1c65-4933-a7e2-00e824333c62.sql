DROP POLICY IF EXISTS "Admin and sales can read leads" ON public.leads;
DROP POLICY IF EXISTS "Admin and sales can update leads" ON public.leads;

CREATE POLICY "Admin and sales can read leads"
ON public.leads
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
      AND ur.role IN ('admin', 'sales')
  )
);

CREATE POLICY "Admin and sales can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
      AND ur.role IN ('admin', 'sales')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
      AND ur.role IN ('admin', 'sales')
  )
);

DROP FUNCTION IF EXISTS public.has_role(UUID, public.app_role);
