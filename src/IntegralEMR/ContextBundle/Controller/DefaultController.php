<?php

namespace IntegralEMR\ContextBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;

class DefaultController extends Controller
{
    public function indexAction($uuid,Request $request)
    {

        $doc = $GLOBALS['em']->getRepository('library\doctrine\Entities\Document')->find($uuid);
        
        $test=$request->get("test","default");
        if($doc==null)
        {
            return new Response("no document found");
        }
        return $this->render('IntegralEMRContextBundle:Default:index.html.twig', array('document' => $doc,  'test'=>$test));
    }
}
