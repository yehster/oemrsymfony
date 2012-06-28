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
        
        $test=$request->request->get("test","default");
        if($doc==null)
        {
            throw $this->createNotFoundException('Document Not Found');
        }
        return $this->render('IntegralEMRContextBundle:Default:index.html.twig', array('document' => $doc,  'test'=>$test));
    }
    
    public function ContextBrowserAction(Request $request)
    {
        $em=$GLOBALS['em'];
        $message=$request->get('foo',"default");
        return $this->render('IntegralEMRContextBundle:ContextManager:index.html.twig', array('msg'=>$message));
        
    }
    
    public function SearchKeywordAction($keywords)
    {
        $kws=explode(" ",$keywords);
        return $this->render('IntegralEMRContextBundle:ContextManager:keyword.html.twig', array('kws'=>$kws));
        
    }
    
}
