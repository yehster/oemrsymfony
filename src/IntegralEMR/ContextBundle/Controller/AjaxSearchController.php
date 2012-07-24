<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AjaxSearchController
 *
 * @author yehster
 */
namespace IntegralEMR\ContextBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;

class VocabInfo
{
    function __construct($description,$code_type,$code)
    {
        $this->description=$description;
        $this->code_type=$code_type;
        $this->code=$code;
    }
    
    public $description;
    
    public $code_type;
    
    public $code;
}

function findVocab($searchString,$vocab_type)
{
    $retval=array();
    $toks=explode(" ",$searchString);
    $shortKW=array();
    $longKW=array();
    foreach($toks as $kw)
    {
        if(strlen($kw)>3)
        {
            $longKW[]=$kw;
        }
        else
        {
            $shortKW[]=$kw;
        }
    }
    $longKWs=implode(" ",$longKW);
    if($vocab_type=="LOINC")
    {
        $entityType="library\doctrine\Entities\LOINC\LOINCEntry";
        $searchField="pt.LONG_COMMON_NAME";
        $descFunc="getLONG_COMMON_NAME";
        $idFunc="getLOINC_NUM";        
    }
    else if($vocab_type="SNOMED")
    {
        $entityType="library\doctrine\Entities\SNOMED\PreferredTerm";
        $searchField="pt.str";
        $descFunc="getSTR";
        $idFunc="getAUI";
        
    }
        $qb = $GLOBALS['em']->createQueryBuilder()
                ->select("pt,MATCH_AGAINST(".$searchField.",'".$longKWs."') as rel");
            if(count($longKW)>0)
            {
                $qb->where("MATCH_AGAINST(".$searchField.",'".$longKWs."') > 0.1");                
            }
            $qb->from($entityType,"pt");
            
            for($idx=0;$idx<count($shortKW);$idx++)
            {
                $qb->andWhere($searchField." like :skw".$idx);
                $qb->setParameter("skw".$idx,"%".$shortKW[$idx]."%");
            }
            $qb->orderBy("rel","desc");
        $qry=$qb->getQuery();
        
        $res=$qry->getResult();
    $qry=$qb->getQuery();

    $res=$qry->getResult();
    foreach($res as $snResult)
    {
        $retval[]=new VocabInfo($snResult[0]->$descFunc(),$vocab_type,$snResult[0]->$idFunc());
    }
    return $retval;
}
class AjaxSearchController extends Controller
{
    public function SearchKeywordAction($keywords)
    {
        $vocab=findVocab($keywords,"LOINC");
        return $this->render('IntegralEMRContextBundle:ContextManager:keyword.html.twig', array("vocab"=>$vocab));
        
    }

}
?>
